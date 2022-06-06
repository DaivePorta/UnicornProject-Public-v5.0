Public Class NMUnidadMedida

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function ListarUnidadesGeneral(ByVal p_codigo As String, ByVal p_estado As String, Optional p_TIPO_UM As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFM_LISTAR_UNIDAD_MEDIDA_GENERAL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNME_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_UM", p_TIPO_UM, ParameterDirection.Input, 253))

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

    Public Function ListarUnidadMedida(ByVal p_codigo As String, ByVal p_estado As String, Optional p_TIPO_UM As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFM_LISTAR_UNIDAD_MEDIDA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNME_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_UM", p_TIPO_UM, ParameterDirection.Input, 253))

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


    Public Function ListarUnidadMedidaPro(ByVal p_codigo As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFM_LISTAR_EQUI_UNME_PROD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNME_CODE", p_codigo, ParameterDirection.Input, 253))

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


    Public Function ActualizarUnidadMedida(ByVal p_codigo As String, ByVal p_codigosunat As String,
                                    ByVal p_descripcion As String, ByVal p_desc_inter As String, ByVal p_desc_cor As String, ByVal p_activo As String,
                                    ByVal p_user As String, ByVal p_unidadbase As String, ByVal p_unidadvolumen As String, ByVal p_TIPO_UND As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFM_ACTUALIZAR_UNIDAD_MEDIDA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_UNME_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SUNAT_CODE", p_codigosunat, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_COR", p_desc_cor, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_INT", p_desc_inter, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_activo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNIDAD_BASE", p_unidadbase, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNIDAD_VOLUMEN", p_unidadvolumen, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_UND", p_TIPO_UND, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearUnidadMedida(ByVal p_codigosunat As String,
                                    ByVal p_descripcion As String, ByVal p_desc_inter As String, ByVal p_desc_cor As String, ByVal p_activo As String,
                                    ByVal p_user As String, ByVal p_unidadbase As String, ByVal p_unidadvolumen As String, ByVal p_TIPO_UND As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFM_CREAR_UNIDAD_MEDIDA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SUNAT_CODE", p_codigosunat, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_COR", p_desc_cor, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_INT", p_desc_inter, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_activo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNIDAD_BASE", p_unidadbase, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNIDAD_VOLUMEN", p_unidadvolumen, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_UND", p_TIPO_UND, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class
