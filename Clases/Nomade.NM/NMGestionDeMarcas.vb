Public Class NMGestionDeMarcas

    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function ListarGestionMarcas(ByVal p_CODE As String, ByVal p_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFM_LISTAR_GESTION_MARCAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstadoGestionMarcas(ByVal p_CODE As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFM_CAMBIAR_ESTADO_GESTION_MARCAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_ESTADO").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearGestionMarcas(ByVal p_MARCA As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String) As String
        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFM_CREAR_GESTION_MARCAS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_MARCA", p_MARCA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_GENERADO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstadoGestionAsientos(ByVal p_CODE As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFM_CAMBIAR_ESTADO_GESTION_ASIENTOS_CAB", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_ESTADO").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarGestionAsientos(ByVal p_CODE As String, ByVal p_ESTADO As String, ByVal p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFM_LISTAR_GESTION_ASIENTOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarOperaciones(ByVal p_CTLG_CODE As String, ByVal p_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SP_Listar_Mnemotecnicos", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearGestionAsientos(ByVal p_NOMBRE As String, ByVal p_DESCRIPCION As String, ByVal p_ESTADO_IND As String, ByVal p_ORDEN As String, ByVal p_USUA_ID As String) As String
        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFM_CREAR_GESTION_ASIENTOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE", p_NOMBRE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORDEN", p_ORDEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_GENERADO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarGestionAsientos(ByVal p_CODE As String, ByVal p_NOMBRE As String, ByVal p_DESCRIPCION As String, ByVal p_ESTADO_IND As String, ByVal p_ORDEN As String, ByVal p_USUA_ID As String) As String
        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFM_ACTUALIZAR_GESTION_ASIENTOS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE", p_NOMBRE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORDEN", p_ORDEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_GENERADO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearGestionAsientosDetalle(ByVal p_CTLG_CODE As String, ByVal p_MNEMO As String, p_CODE As String) As String
        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFM_CREAR_GESTION_ASIENTOS_DETALLE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MNEMO", p_MNEMO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_GENERADO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstadoGestionAsientos(ByVal p_MNEMO_DESC As String, ByVal p_CODE As String, ByVal p_CTLG_CODE As String) As String
        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFM_CAMBIAR_ESTADO_GESTION_ASIENTOS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_MNEMO_DESC", p_MNEMO_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = ""

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarGestionMarcas(ByVal p_CODE As String, ByVal p_MARCA As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String) As String
        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFM_ACTUALIZAR_GESTION_MARCAS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARCA", p_MARCA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_GENERADO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearGestionMarcasSubGrupos(ByVal p_CTLG_CODE As String, ByVal p_GRUP_CODE As String, ByVal p_SUBGRUP_CODE As String,
                                                ByVal p_MARC_CODE As String, ByVal p_USUA_ID As String, ByVal p_TODOS As String) As String
        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFM_CREAR_GESTION_MARCAS_SUBGRUPO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SUBGRUP_CODE", p_SUBGRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARC_CODE", p_MARC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TODOS", p_TODOS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_GENERADO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstadoGestionMarcasSubGrupos(ByVal p_SUBGRUP_CODE As String, ByVal p_CODE As String, ByVal p_USUA_ID As String) As String
        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFM_CAMBIAR_ESTADO_GESTION_MARCAS_SUBGRUPO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_SUBGRUP_CODE", p_SUBGRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = ""

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarGestionMarcasGrupo(ByVal p_GUPO As String, ByVal p_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFM_LISTAR_MARCAS_SUBGRUPO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO", p_GUPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    'jhp
    Public Function RegistroAcreditacion(ByVal p_FTVACRE_TIPO_ACREDITA As String, ByVal p_FTVACRE_DESCRIPCION As String,
                                         ByVal p_FTVACRE_DETALLE As String, ByVal p_FTVACRE_PROCEDENCIA As String,
                                         ByVal p_FTVACRE_ESTADO As String, ByVal p_FTVACRE_USUA_ID As String) As String
        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("SP_REGISTRAR_ACREDITACION", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVACRE_TIPO_ACREDITA", p_FTVACRE_TIPO_ACREDITA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVACRE_DESCRIPCION", p_FTVACRE_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVACRE_DETALLE", p_FTVACRE_DETALLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVACRE_PROCEDENCIA", p_FTVACRE_PROCEDENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVACRE_ESTADO", p_FTVACRE_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVACRE_USUA_ID", p_FTVACRE_USUA_ID, ParameterDirection.Input, 253))


            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_GENERADO").Value
            'cmd1 = cn.Ejecuta_parms(cmd)
            'msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function ActualizarAcreditacion(ByVal p_FTVACRE_CODIGO As String, ByVal p_FTVACRE_TIPO_ACREDITA As String, ByVal p_FTVACRE_DESCRIPCION As String,
                                        ByVal p_FTVACRE_DETALLE As String, ByVal p_FTVACRE_PROCEDENCIA As String,
                                        ByVal p_FTVACRE_ESTADO As String, ByVal p_FTVACRE_USUA_ID As String) As String
        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("SP_ACTUALIZA_ACREDITACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVACRE_CODIGO", p_FTVACRE_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVACRE_TIPO_ACREDITA", p_FTVACRE_TIPO_ACREDITA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVACRE_DESCRIPCION", p_FTVACRE_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVACRE_DETALLE", p_FTVACRE_DETALLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVACRE_PROCEDENCIA", p_FTVACRE_PROCEDENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVACRE_ESTADO", p_FTVACRE_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVACRE_USUA_ID", p_FTVACRE_USUA_ID, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function ListarAcreditacion(ByVal p_FTVACRE_CODIGO As String, ByVal p_FTVACRE_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SP_LISTA_ACREDITACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVACRE_CODIGO", p_FTVACRE_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVACRE_ESTADO", p_FTVACRE_ESTADO, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function ActualizarAcreditacionEstado(ByVal p_FTVACRE_CODIGO As String) As String
        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("SP_ACTUALIZA_ACREDITACION_ESTADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVACRE_CODIGO", p_FTVACRE_CODIGO, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function RegistroAcreditacionPRD(ByVal P_FTVACRE_CODIGO As String, ByVal P_FTVPRD_CODIGO As String,
                                         ByVal P_FTVACRE_PRD_NRO_UNICO As String, ByVal P_FTVACRE_PRD_FECHA_INICIO As String,
                                         ByVal P_FTVACRE_PRD_FECHA_FIN As String, P_FTVACRE_PRD_ESTADO As String,
                                         ByVal p_FTVACRE_USUA_ID As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            Dim dtFechaInicio As DateTime = Convert.ToDateTime(P_FTVACRE_PRD_FECHA_INICIO)
            Dim dtFechaFin As DateTime = Convert.ToDateTime(P_FTVACRE_PRD_FECHA_FIN)

            P_FTVACRE_PRD_FECHA_INICIO = Format(dtFechaInicio, "yyyyMMdd")
            P_FTVACRE_PRD_FECHA_FIN = Format(dtFechaFin, "yyyyMMdd")


            cmd = cn.GetNewCommand("SP_REGISTRAR_ACREDITACION_PRODUCTO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_FTVACRE_CODIGO", P_FTVACRE_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FTVPRD_CODIGO", P_FTVPRD_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FTVACRE_PRD_NRO_UNICO", P_FTVACRE_PRD_NRO_UNICO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FTVACRE_PRD_FECHA_INICIO", P_FTVACRE_PRD_FECHA_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FTVACRE_PRD_FECHA_FIN", P_FTVACRE_PRD_FECHA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FTVACRE_PRD_ESTADO", P_FTVACRE_PRD_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FTVACRE_PRD_USUA_ID", p_FTVACRE_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_GENERADO").Value
            'cmd1 = cn.Ejecuta_parms(cmd)
            'msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function ListarProductoAcreditacion(ByVal P_FTVPRD_CODIGO As String, ByVal P_FTVACRE_PRD_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SP_LISTAR_ACREDITACION_PRODUCTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_FTVPRD_CODIGO", P_FTVPRD_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FTVACRE_PRD_ESTADO", P_FTVACRE_PRD_ESTADO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


End Class
