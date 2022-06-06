Public Class CANotaDebito
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Function CrearNotaDebito(p_CTLG_CODE As String, p_SCSL_CODE As String, p_PERS_PIDM As String, p_FECHA_EMISION As String,
                              p_NUM_SERIE As String, p_NUM_DCTO As String, p_MOTIVO_CODE As String, p_MOTIVO_DESC As String, p_MOTIVO_ADICIONAL As String,
                              p_MONE_CODE As String, p_TIPO_IND As String, p_IMPORTE_EXO As String, p_IMPORTE_INA As String, p_IMPORTE_GRA As String,
                              p_IGV As String, p_IMPORTE_TOTAL As String, p_PCTJ_IGV As String,
                              p_USUA_ID As String, p_SCSL_EXONERADA_IND As String,
                              p_DCTO_REF_CODE As String, p_DCTO_REF_TIPO_CODE As String, p_COD_AUT As String,
                              p_DETALLES As String, p_MES As Integer, p_ANIO As Integer) As Array
        Dim msg(2) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFB_CREAR_NOTA_DEBITO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERS_PIDM", p_PERS_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOTIVO_CODE", p_MOTIVO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOTIVO_DESC", p_MOTIVO_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOTIVO_ADICIONAL", p_MOTIVO_ADICIONAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_TIPO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_REF_CODE", p_DCTO_REF_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_REF_TIPO_CODE", p_DCTO_REF_TIPO_CODE, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_EXO", p_IMPORTE_EXO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_INA", p_IMPORTE_INA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_GRA", p_IMPORTE_GRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_TOTAL", p_IMPORTE_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PCTJ_IGV", p_PCTJ_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_EXONERADA_IND", p_SCSL_EXONERADA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AUT", p_COD_AUT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES", p_DETALLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE_NRO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPUESTA", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", If(p_MES = 0, DBNull.Value, p_MES), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", If(p_ANIO = 0, DBNull.Value, p_ANIO), ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_CODE").Value
            msg(1) = cmd.Parameters("@p_SERIE_NRO").Value
            msg(2) = cmd.Parameters("@p_RESPUESTA").Value

        Catch ex As Exception
            msg(0) = ex.Message
            msg(1) = ""
            msg(2) = ""
        End Try

        Return msg

    End Function

    'LISTA CABECERA DE UNA NOTA DE DÉBITO
    Function ListarNotaDebito(ByVal p_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_PERS_PIDM As String, ByVal p_TIPO_IND As String) As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_NOTA_DEBITO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERS_PIDM", p_PERS_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_TIPO_IND, ParameterDirection.Input, 253))

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

    'LISTA DETALLES DE UNA NOTA DE DÉBITO
    Function ListarDetalleNotaDebito(ByVal p_CODE As String, ByVal p_ITEM As String) As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_DETALLE_NOTA_DEBITO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))

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

    Function ListarMotivoNotaDebito(p_ESTADO_IND As String) As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_MOTIVO_NOTA_DEBITO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
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
