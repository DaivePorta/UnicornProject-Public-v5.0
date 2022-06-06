Public Class MPFormulacionProductos

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function ListarFormulaciones(ByVal P_CODIGO As String, ByVal P_CODIGO_AF As String, ByVal P_CTLG As String, ByVal P_SCSL As String, ByVal P_ALMC_CODE As String, ByVal P_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFR_LISTAR_FORMULACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODIGO", P_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODE", P_CODIGO_AF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ALMC_CODE", P_SCSL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function CrearFormulacion(ByVal P_CTLG_CODE As String, ByVal P_ALMC_CODE As String, ByVal P_PROD_CODE As String, ByVal P_PROC_CODE As String,
                                     ByVal P_HORAS As String, ByVal P_TIEMPO As String, ByVal P_CANTIDAD As String, ByVal P_UNID_CODE As String,
                                     ByVal P_USUA_ID As String,
                                     ByVal P_INSUMOS As String, ByVal P_UNIDADES As String, ByVal P_CANTIDADES As String, ByVal P_MERMAS As String,
                                     ByVal P_MAQUINARIAS As String, ByVal P_CANTIDADES_M As String,
                                     ByVal P_DERIVADOS As String, ByVal P_UNIDADES_DERIVADOS As String, ByVal P_CANTIDADES_DERIVADOS As String, ByVal P_PORCENTAJES_DERIVADOS As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFR_CREAR_FORMULACION", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ALMC_CODE", P_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODE", P_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROC_CODE", P_PROC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HORAS", P_HORAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIEMPO", P_TIEMPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CANTIDAD", P_CANTIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_UNID_CODE", P_UNID_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_INSUMOS", P_INSUMOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_UNIDADES", P_UNIDADES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CANTIDADES", P_CANTIDADES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MERMAS", P_MERMAS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_MAQUINARIAS", P_MAQUINARIAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CANTIDADES_M", P_CANTIDADES_M, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_DERIVADOS", P_DERIVADOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_UNIDADES_DERIVADOS", P_UNIDADES_DERIVADOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CANTIDADES_DERIVADOS", P_CANTIDADES_DERIVADOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PORCENTAJES_DERIVADOS", P_PORCENTAJES_DERIVADOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@P_CODE").Value
            Return msg
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function

    Public Function ActualizarFormulacion(ByVal P_CODE As String, ByVal P_ALMC_CODE As String, ByVal P_PROD_CODE As String, ByVal P_PROC_CODE As String,
                                          ByVal P_HORAS As String, ByVal P_TIEMPO As String,
                                         ByVal P_CANTIDAD As String, ByVal P_UNID_CODE As String, ByVal P_ESTADO_IND As String, ByVal P_USUA_ID As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFR_ACTUALIZAR_FORMULACION", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ALMC_CODE", P_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODE", P_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROC_CODE", P_PROC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HORAS", P_HORAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIEMPO", P_TIEMPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CANTIDAD", P_CANTIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_UNID_CODE", P_UNID_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))

            cn.Ejecuta_parms(cmd)

            msg = "OK"
            Return msg
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function

    Public Function CambiarEstadoFormulacion(ByVal P_CODE As String, ByVal P_USUA_ID As String) As String
        Try
            Dim estado As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFR_CAMBIAR_ESTADO_FORMULACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            estado = cmd1.Parameters("@P_ESTADO").Value

            Return estado

        Catch ex As Exception
            Return ex.Message
        End Try
    End Function

    Public Function AgregarInsumo(ByVal P_CODE As String, ByVal P_PROD_CODE As String, ByVal P_CANTIDAD As String,
                                  ByVal P_MERMA As String, ByVal P_UNID_CODE As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFR_AGREGAR_INSUMO_FORMULACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODE", P_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CANTIDAD", P_CANTIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MERMA", P_MERMA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_UNID_CODE", P_UNID_CODE, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function

    Public Function EliminarInsumo(ByVal P_CODE As String, ByVal P_PROD_CODE As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFR_ELIMINAR_INSUMO_FORMULACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODE", P_PROD_CODE, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function

    Public Function ListarInsumosFormulacion(ByVal P_CODE As String, Optional ByVal P_PROD_CODE As String = "",
                                             Optional P_CTLG_CODE As String = "", Optional ByVal P_SCSL_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFR_LISTAR_INSUMOS_FORMULACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODE", P_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function AgregarDerivado(ByVal P_CODE As String, ByVal P_PROD_CODE As String, ByVal P_CANTIDAD As String, ByVal P_UNID_CODE As String, ByVal P_PORCENTAJE_COSTO As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFR_AGREGAR_DERIVADO_FORMULACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODE", P_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CANTIDAD", P_CANTIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_UNID_CODE", P_UNID_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PORCENTAJE_COSTO", P_PORCENTAJE_COSTO, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function

    Public Function EliminarDerivado(ByVal P_CODE As String, ByVal P_PROD_CODE As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFR_ELIMINAR_DERIVADO_FORMULACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODE", P_PROD_CODE, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function

    Public Function ListarDerivadosFormulacion(ByVal P_CODE As String, Optional ByVal P_PROD_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFR_LISTAR_DERIVADOS_FORMULACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODE", P_PROD_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function AgregarMaquinaria(ByVal P_CODE As String, ByVal P_GRUP_CODE As String, ByVal P_CANTIDAD As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFR_AGREGAR_MAQUINARIA_FORMULACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_GRUP_CODE", P_GRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CANTIDAD", P_CANTIDAD, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function

    Public Function EliminarMaquinaria(ByVal P_CODE As String, ByVal P_GRUP_CODE As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFR_ELIMINAR_MAQUINARIA_FORMULACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_GRUP_CODE", P_GRUP_CODE, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function

    Public Function ListarMaquinariasFormulacion(ByVal P_CODE As String, Optional ByVal P_PROD_CODE As String = "", Optional ByVal P_CTLG_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFR_LISTAR_MAQUINARIAS_FORMULACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODE", P_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

End Class
